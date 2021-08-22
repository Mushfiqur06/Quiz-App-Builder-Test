import React, { Component } from "react";
import Portal from "@reach/portal";
import styled from "styled-components";
import { Spring } from "react-spring/renderprops.cjs.js";
import { MdClose } from "react-icons/md";
import classnames from "classnames";
import { useKeyPress } from "./hooks/useKeyPress";
const ModalConatiner: any = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  z-index: ${(props: any) => props.zIndex || 10};
`;
const ModalHeaderContainer = styled.header.attrs({
  className: "flex justify-between items-center",
})`
  padding: 1rem 1.2rem;
`;

const ModalContent: any = styled.div.attrs({ className: "bg-white" })`
  margin: ${(props: any) => (props.full ? "0px 0px 0px 0px" : "1.7rem auto")};
  max-width: ${(props: any) =>
    props.modalContentWidth ? props.modalContentWidth : "465px"};

  @media (max-width: 1300px) {
    max-width: 50%;
  }
  @media (max-width: 767px) {
    max-width: 80%;
  }
  min-width: ${(props: any) =>
    props.full
      ? "100%"
      : props.modalContentWidth
      ? props.modalContentWidth
      : "50%"};
  min-height: ${(props: any) => props.full && "100vh"};
`;
const ModalContentFull = styled.div`
  margin: 0px 0px 0px 0px;
  width: 100%;
  min-height: 100vh;
`;
export function Modal({
  isActive,
  header,
  close = () => null,
  renderBody,
  modalContentWidth,
  zIndex,
  contentStyle,
}: {
  isActive: boolean;
  header?: (() => React.ReactNode) | boolean;
  close?: () => void;
  renderBody: () => React.ReactNode;
  modalContentWidth?: string;
  zIndex?: string | number;
  contentStyle?: any;
}): JSX.Element {
  const ref = React.useRef<HTMLDivElement>();
  const escPress = useKeyPress("Escape");
  React.useEffect(() => {
    if (escPress && close && isActive) {
      close();
    }
  }, [escPress, close, isActive]);
  useOnClickOutside(ref, () => close());
  return (
    <Portal>
      {isActive ? (
        <ModalConatiner
          full
          zIndex={zIndex}
          style={{
            background: "rgba(124, 124, 124, 0.5)",
          }}
        >
          <Spring
            from={{
              transform: "translateY(100px)",
            }}
            to={{
              transform: "translateY(0)",
            }}
          >
            {(props: any) => {
              return (
                <ModalContent
                  style={{ ...props, ...contentStyle }}
                  modalContentWidth={modalContentWidth}
                  className={classnames("rounded ")}
                  ref={ref}
                >
                  {typeof header === "function" ? (
                    <ModalHeaderContainer>
                      <h3 className='font-bold text-gray-800'>{header()}</h3>
                      <button
                        onClick={close}
                        className='transition-all duration-75 ease-linear rounded-full hover:bg-gray-700 hover:text-white'
                      >
                        <MdClose size={25} />
                      </button>
                    </ModalHeaderContainer>
                  ) : null}
                  <section className='p-4 bg-white'>{renderBody()}</section>
                </ModalContent>
              );
            }}
          </Spring>
        </ModalConatiner>
      ) : null}
    </Portal>
  );
}

// Hook

function useOnClickOutside(ref: any, handler: any) {
  React.useEffect(() => {
    const listener = (event: any) => {
      // Do nothing if clicking ref's element or descendent elements

      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }

      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
