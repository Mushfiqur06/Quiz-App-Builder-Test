import styled from "styled-components";
import { PulseLoader } from "react-spinners";
import tw from "twin.macro";
const ButtonStyle: any = styled.button`
  ${tw`relative inline-flex items-center justify-center p-1 overflow-hidden whitespace-no-wrap bg-white border border-black border-solid text-blue-400`}

  ${(props: any) => {
    const returnValue = [];
    if (props.rounded) {
      returnValue.push(tw`rounded-full`);
    } else {
      returnValue.push(tw`rounded`);
    }
    if (props.small) {
      returnValue.push(tw`px-4 py-1`);
    } else {
      returnValue.push(tw`px-8 py-3`);
    }
    if (props.primary) {
      returnValue.push(tw`text-white bg-green-500 border-black`);
    }
    if (props.black) {
      returnValue.push(tw`text-white bg-black border-black`);
    }
    if (props.block) {
      returnValue.push(tw`w-full`);
    }

    if (props.outline) {
      returnValue.push(tw`bg-white`);
    }
    if (props.outline && props.primary) {
      returnValue.push(tw`bg-white border-black text-blue-400`);
    }
    if (props.disabled) {
      returnValue.push(
        tw`text-gray-600 bg-gray-300 border-gray-300 cursor-not-allowed`
      );
    }
    if (props.disabled && props.primary) {
      returnValue.push(
        tw`text-gray-600 border-gray-300 cursor-not-allowed`
      );
    }
    if (props.secondary) {
      returnValue.push(tw`text-white`);
    }

    return returnValue;
  }}
`;

type Props = {
  children: React.ReactNode;
  onClick?: (event: MouseEvent) => void;
  text?: boolean;
  outline?: boolean;
  secondary?: boolean;
  block?: boolean;
  primary?: boolean;
  small?: boolean;
  rounded?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  style?: any;
  customRef?: any;
  black?: boolean;
  [key: string]: any;
};

export const Button: React.FunctionComponent<Props> = ({
  children,
  onClick,
  text,
  outline,
  secondary,
  block,
  primary,
  small,
  rounded,
  style,
  disabled,
  isLoading,
  customRef,
  black,
  ...props
}: Props) => {
  const loaderColor = () => {
    if (primary && outline) {
      return "#C53030";
    }
    if (secondary && outline) {
      return "#3d4b54";
    }
    if (secondary) {
      return "white";
    }
    if (primary) {
      return "white";
    }
    if (black) {
      return "#000000";
    }
    return "#ffffff00";
  };

  return (
    <ButtonStyle
      ref={customRef}
      disabled={disabled}
      onClick={onClick}
      style={style}
      text={text}
      outline={outline}
      secondary={secondary}
      block={block}
      primary={primary}
      small={small}
      rounded={rounded}
      black={black}
      {...props}
    >
      {isLoading ? (
        <div className='py-1 leading-none'>
          <PulseLoader color={loaderColor()} loading={true} size={9} />
        </div>
      ) : (
        <>{children}</>
      )}
    </ButtonStyle>
  );
};
