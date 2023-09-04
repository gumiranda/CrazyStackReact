import * as React from "react";
import { useCombobox, useMultipleSelection, UseMultipleSelectionProps } from "downshift";
import Highlighter from "react-highlight-words";
import useDeepCompareEffect from "react-use/lib/useDeepCompareEffect";
import { FormLabel, FormLabelProps } from "@chakra-ui/form-control";
import { Stack, Box, BoxProps, List, ListItem, ListIcon } from "@chakra-ui/layout";
import { Input, InputProps } from "@chakra-ui/input";
import { IconProps, CheckCircleIcon } from "@chakra-ui/icons";
import { ComponentWithAs } from "@chakra-ui/react";

export interface Item {
  label: string;
  value: string;
}

export interface CUIAutoCompleteProps<T extends Item>
  extends UseMultipleSelectionProps<T> {
  items: T[];
  placeholder: string;
  label: string;
  highlightItemBg?: string;
  onCreateItem?: (item: T) => void;
  optionFilterFunc?: (items: T[], inputValue: string) => T[];
  itemRenderer?: (item: T) => string | JSX.Element;
  labelStyleProps?: FormLabelProps;
  inputStyleProps?: InputProps;
  listStyleProps?: BoxProps;
  listItemStyleProps?: BoxProps;
  emptyState?: (inputValue: string) => React.ReactNode;
  selectedIconProps?: Omit<IconProps, "name"> & {
    icon: IconProps["name"] | React.ComponentType;
  };
  icon?: ComponentWithAs<"svg", IconProps>;
  hideToggleButton?: boolean;
  createItemRenderer?: (value: string) => string | JSX.Element;
  disableCreateItem?: boolean;
}

function defaultOptionFilterFunc(items: any, inputValue: string) {
  const resultadoFiltrado = items.filter((item: any) => {
    const chaves = ["value", "label"]; // Chaves a serem consideradas na pesquisa

    for (const chave of chaves) {
      if (item[chave] && item[chave].toLowerCase().includes(inputValue.toLowerCase())) {
        return true;
      }
    }

    return false;
  });

  return resultadoFiltrado;
}

export const CUIAutoComplete = <T extends Item>(
  props: CUIAutoCompleteProps<T>
): React.ReactElement<CUIAutoCompleteProps<T>> => {
  const {
    items,
    optionFilterFunc = defaultOptionFilterFunc,
    itemRenderer,
    highlightItemBg = "gray.100",
    placeholder,
    label,
    listStyleProps,
    labelStyleProps,
    inputStyleProps,
    selectedIconProps,
    listItemStyleProps,
    onCreateItem,
    icon,
    ...downshiftProps
  } = props;

  /* States */
  const [isCreating, setIsCreating] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [inputItems, setInputItems] = React.useState<T[]>(items);

  /* Refs */
  const disclosureRef = React.useRef(null);

  /* Downshift Props */
  const { getDropdownProps, addSelectedItem, removeSelectedItem, selectedItems } =
    useMultipleSelection(downshiftProps);
  const selectedItemValues = selectedItems.map((item) => item.value);

  const {
    isOpen,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    selectItem,
  } = useCombobox({
    inputValue,
    selectedItem: undefined,
    items: inputItems,
    onInputValueChange: ({ inputValue, selectedItem }) => {
      const filteredItems = optionFilterFunc(items, inputValue || "");

      if (isCreating && filteredItems.length > 0) {
        setIsCreating(false);
      }

      if (!selectedItem) {
        setInputItems(filteredItems);
      }
    },
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
          return {
            ...changes,
            isOpen: false,
          };
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            highlightedIndex: state.highlightedIndex,
            inputValue,
            isOpen: true,
          };
        case useCombobox.stateChangeTypes.FunctionSelectItem:
          return {
            ...changes,
            inputValue,
          };
        default:
          return changes;
      }
    },
    // @ts-ignore
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue || "");
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (selectedItem) {
            if (selectedItemValues.includes(selectedItem.value)) {
              removeSelectedItem(selectedItem);
            } else {
              if (onCreateItem && isCreating) {
                onCreateItem(selectedItem);
                setIsCreating(false);
                setInputItems(items);
                setInputValue("");
              } else {
                addSelectedItem(selectedItem);
              }
            }

            // @ts-ignore
            selectItem(null);
          }
          break;
        default:
          break;
      }
    },
  });

  useDeepCompareEffect(() => {
    setInputItems(items);
  }, [items]);

  /* Default Items Renderer */
  function defaultItemRenderer<T extends Item>(selected: T) {
    return selected.label;
  }

  return (
    <Stack>
      <FormLabel {...{ ...getLabelProps({}), ...labelStyleProps }}>{label}</FormLabel>

      <Stack {...getComboboxProps()}>
        <Input
          {...inputStyleProps}
          {...getInputProps(
            getDropdownProps({
              placeholder,
              onClick: isOpen ? () => {} : openMenu,
              onFocus: isOpen ? () => {} : openMenu,
              ref: disclosureRef,
            })
          )}
        />
      </Stack>
      <Box pb={4} mb={4}>
        <List
          bg="white"
          borderRadius="4px"
          border={isOpen && "1px solid rgba(0,0,0,0.1)"}
          boxShadow="6px 5px 8px rgba(0,50,30,0.02)"
          {...listStyleProps}
          {...getMenuProps()}
        >
          {isOpen &&
            inputItems.map((item, index) => (
              <ListItem
                px={2}
                py={1}
                borderBottom="1px solid rgba(0,0,0,0.01)"
                {...listItemStyleProps}
                bg={highlightedIndex === index ? highlightItemBg : "inherit"}
                key={`${item.value}${index}`}
                {...getItemProps({ item, index })}
              >
                <Box display="inline-flex" alignItems="center">
                  {selectedItemValues.includes(item.value) && (
                    <ListIcon
                      as={icon || CheckCircleIcon}
                      color="green.500"
                      role="img"
                      display="inline"
                      aria-label="Selected"
                      {...selectedIconProps}
                    />
                  )}

                  {itemRenderer ? (
                    itemRenderer(item)
                  ) : (
                    <Highlighter
                      autoEscape
                      searchWords={[inputValue || ""]}
                      textToHighlight={defaultItemRenderer(item)}
                    />
                  )}
                </Box>
              </ListItem>
            ))}
        </List>
      </Box>
    </Stack>
  );
};
