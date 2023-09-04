import * as React from "react";
import { useCombobox, useMultipleSelection, UseMultipleSelectionProps } from "downshift";
import Highlighter from "react-highlight-words";
import useDeepCompareEffect from "react-use/lib/useDeepCompareEffect";
import { Stack, Box, BoxProps, List, ListItem } from "@chakra-ui/layout";
import { forwardRef } from "react";

export interface Item {
  label: string;
  value: string;
}

export interface CUIAutoCompleteProps<T extends Item>
  extends UseMultipleSelectionProps<T> {
  items: T[];
  renderInput: any;
  placeholder: string;
  highlightItemBg?: string;
  optionFilterFunc?: (items: T[], inputValue: string) => T[];
  itemRenderer?: (item: T) => string | JSX.Element;
  listStyleProps?: BoxProps;
  listItemStyleProps?: BoxProps;
  emptyState?: (inputValue: string) => React.ReactNode;
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

export const CUIAutoComplete_ = <T extends Item>(
  props: CUIAutoCompleteProps<T>,
  ref: any
): React.ReactElement<CUIAutoCompleteProps<T>> => {
  const {
    items,
    optionFilterFunc = defaultOptionFilterFunc,
    itemRenderer,
    highlightItemBg = "gray.100",
    placeholder,
    listStyleProps,
    listItemStyleProps,
    renderInput,
    ...downshiftProps
  } = props;

  /* States */
  const [inputValue, setInputValue] = React.useState("");
  const [inputItems, setInputItems] = React.useState<T[]>(items);

  /* Downshift Props */
  const { getDropdownProps } = useMultipleSelection(downshiftProps);

  const {
    isOpen,
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
    onInputValueChange: ({ inputValue }) => {
      const filteredItems = optionFilterFunc(items, inputValue || "");
      setInputItems(filteredItems);
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
            setInputValue(selectedItem.label); // Set input value to selected item's label
          }
          // @ts-ignore
          selectItem(null);
          break;
        default:
          break;
      }
    },
    //...downshiftProps,
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
      <Stack {...getComboboxProps()}>
        {renderInput({
          ...getInputProps(
            getDropdownProps({
              placeholder,
              onClick: isOpen ? () => {} : openMenu,
              onFocus: isOpen ? () => {} : openMenu,
              ref,
            })
          ),
        })}
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
export const CUIAutoComplete = forwardRef(CUIAutoComplete_);
