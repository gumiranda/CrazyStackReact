import * as React from "react";
import { useCombobox, useMultipleSelection } from "downshift";
import Highlighter from "react-highlight-words";
import { useDeepCompareEffect } from "react-use";
import { Stack, Box, List, ListItem } from "@chakra-ui/react";
import { forwardRef, useState } from "react";

export interface Item {
  label: string;
  value: string;
}

function defaultOptionFilterFunc(items: any, inputValue: string) {
  const resultFiltered =
    items?.filter?.((item: any) => {
      const keys = ["value", "label"];
      for (const key of keys) {
        if (item?.[key]?.toLowerCase?.()?.includes?.(inputValue?.toLowerCase?.())) {
          return true;
        }
      }
      return false;
    }) ?? [];
  return resultFiltered;
}
const AutoComplete_ = (props: any, ref: any) => {
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
  const [inputValue, setInputValue] = useState("");
  const [inputItems, setInputItems] = useState(items);
  const downshiftId = "randomid-:R1ARBDJ9:";
  const { getDropdownProps } = useMultipleSelection(downshiftProps);
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    openMenu,
    selectItem,
  } = useCombobox({
    inputValue,
    items: inputItems,
    id: downshiftId,
    onInputValueChange: ({ inputValue }) => {
      const filteredItems = optionFilterFunc(items, inputValue ?? "");
      setInputItems(filteredItems);
    },
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useCombobox.stateChangeTypes.InputBlur:
          return { ...changes, isOpen: false };
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          return {
            ...changes,
            highlightedIndex: state?.highlightedIndex,
            inputValue,
            isOpen: false,
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
    onStateChange: ({ inputValue, type, selectedItem }: any) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue || "");
          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
          if (selectedItem) {
            setInputValue(selectedItem.label as any);
          }
          // @ts-ignore
          selectItem(null);
          break;
        default:
          break;
      }
    },
  }) as any;
  useDeepCompareEffect(() => {
    setInputItems(items);
  }, [items]);
  function defaultItemRenderer<T extends Item>(selected: T) {
    return selected.label;
  }
  return (
    <Stack>
      <Stack>
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
          borderRadius="4px"
          border={isOpen ? "1px solid rgba(0,0,0,0.1)" : "none"}
          boxShadow={"6px 5px 8px rgba(0,50,30,0.2)"}
          {...listStyleProps}
          id={downshiftId}
          {...getMenuProps()}
        >
          {isOpen &&
            inputItems?.map?.((item: any, index: number) => (
              <ListItem
                px={2}
                py={1}
                borderBottom="1px solid rgba(0,0,0,0.01)"
                {...listItemStyleProps}
                bg={highlightedIndex === index ? highlightItemBg : "inherit"}
                key={`${item?.value}${index}`}
                {...getItemProps({ item, index })}
              >
                <Box display="inline-flex" alignItems="center">
                  {itemRenderer ? (
                    itemRenderer(item)
                  ) : (
                    <Highlighter
                      autoEscape
                      searchWords={[inputValue ?? ""]}
                      textToHightlight={defaultItemRenderer(item)}
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

export const AutoComplete = forwardRef(AutoComplete_);
