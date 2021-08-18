import { usePopper } from "react-popper";
import styled from "styled-components";

import Portal from "@reach/portal";
import React from "react";
const PopoverContainer = styled.div`
  background-color: transparent;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;
type Placement =
  | "auto"
  | "auto-start"
  | "auto-end"
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "right"
  | "right-start"
  | "right-end"
  | "left"
  | "left-start"
  | "left-end";
export const CustomPopover = ({
  placement,
  renderReference,
  renderPopover,
}: {
  placement?: Placement;
  renderReference: (ref: any, toggle: () => void) => JSX.Element;
  renderPopover: (toggle: () => void) => JSX.Element;
}) => {
  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState<any>(null);
  const [isOpen, setIsOpen] = React.useState(false);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    strategy: "fixed",
    placement: placement || "bottom",
  });

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      {renderReference(setReferenceElement, toggle)}
      {isOpen && (
        <Portal>
          <PopoverContainer
            onClick={(event) => {
              if (popperElement && popperElement.contains(event.target)) {
                return;
              }
              toggle();
            }}
          >
            <div
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              {renderPopover(toggle)}
            </div>
          </PopoverContainer>
        </Portal>
      )}
    </>
  );
};
