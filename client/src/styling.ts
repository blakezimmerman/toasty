import * as styledComponents from "styled-components";

type Color =
  | "primary"
  | "primaryText"
  | "text"
  | "background"
  | "success"
  | "failure"
  | "disabled";

type Font = "primary";

interface ITheme {
  colors: Record<Color, string>;
  fonts: Record<Font, string>;
}

const theme: ITheme = {
  colors: {
    primary: "#7D2BC8",
    primaryText: "#FFFFFF",
    text: "#4A4A4A",
    background: "#FFFFFF",
    success: "#09AC47",
    failure: "#AC1909",
    disabled: "#E6E6E6",
  },
  fonts: {
    primary: "'Lato', sans-serif",
  },
};

// Theme selectors

type ThemedStyledProps = styledComponents.ThemedStyledProps<{}, ITheme>;

const themeColor = (colorName: Color) => (props: ThemedStyledProps) =>
  props.theme.colors[colorName];

const themeFont = (fontName: Font) => (props: ThemedStyledProps) =>
  props.theme.fonts[fontName];

function maxWidthMedia(maxWidth: string) {
  return (
    arg: TemplateStringsArray,
    ...args: styledComponents.SimpleInterpolation[]
  ) => css`
    @media (max-width: ${maxWidth}) {
      ${css(arg, ...args)};
    }
  `;
}

/**
 * This would be called like so:
 * import styled, { media } from "styling";
 * const Wrapper = styled.div`
 *   ${media.mobile`
 *     display: none;
 *   `}
 * `;
 */
const media = {
  mobile: maxWidthMedia("768px"),
};

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  withTheme,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<ITheme>;

export {
  css,
  createGlobalStyle,
  keyframes,
  withTheme,
  ITheme,
  theme,
  themeColor,
  themeFont,
  media,
};
export default styled;
