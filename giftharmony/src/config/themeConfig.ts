import { PaletteMode, ThemeOptions } from "@mui/material";

declare module '@mui/material/styles' {
  interface Palette {
    general: Palette['primary'];
    font: Palette['primary'];
    table: Palette['primary'];
    button: Palette['primary'];
    alertbutton: Palette['primary'];
  }

  interface PaletteOptions {
    general?: PaletteOptions['primary'];
    font?: PaletteOptions['primary'];
    table?: PaletteOptions['primary'];
    button?: PaletteOptions['primary'];
    alertbutton?: PaletteOptions['primary'];
  }

  interface TypeBackground {
    alert: string;
  }
}

declare module '@mui/material/' {
  interface ButtonPropsColorOverrides {
    general: true;
  }

  interface RadioPropsColorOverrides {
    general: true;
  }
}

export const generalThemeConfig: ThemeOptions = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 610,
      md: 930,
      lg: 1280,
      xl: 1800,
    },
  },
  typography: {
    fontFamily: "Poppins",
    h1: {
      fontSize: "3.5rem",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: "bold",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 400,
    },
    h4: {
      fontSize: "1.2rem",
      fontWeight: 500,
    },
  },
  components: {
    MuiTypography: {
      defaultProps: {
        fontFamily: "Poppins",
      }
    },
    MuiDialog: {
      defaultProps: {
        onWheel: (e: React.WheelEvent) => e.stopPropagation(),
      }
    },
  }
};

export const DefaultTheme = (mode: PaletteMode) => ({
  palette: {
    general: {
      main: "#FFEEEE",
      light: '#FFDDDD',
      dark: '#6A4B37',
      contrastText: '#6A4B37',
    },
    font: {
      main: "#F3F3F3"
    },
    table: {
      dark: "#B06261",
      light: "#D1ACAC"
    },
    button:{
      main: "#BE5050",
      light: "#C1B9B9",
      dark: "#658767",
    },
    alertbutton:{
      main: "#5873E0",
      light: "#FFF5E0"
    },
    mode,
    ...(mode === 'light'
      ? {
        // Light
        background: {
          default: "#FFEEEE",
          alert: "#FFC5C5"
        },
      }
      : {
        // Dark
        background: {
          default: "#1a2026",
          alert: "#FFC5C5"
        },
      }),
  },
  ...(mode === 'light' ? {
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            "&.Mui-focused": {
              color: theme.palette.secondary.main,
            },
          }),
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            // "&:hover .MuiOutlinedInput-notchedOutline": {
            //   borderColor: "red",
            // },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.secondary.main,
            },
          }),
        },
      },
    }
  } : {
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: ({ theme }) => ({
            "&.Mui-focused": {
              color: theme.palette.primary.main,
            },
          }),
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: ({ theme }) => ({
            // "&:hover .MuiOutlinedInput-notchedOutline": {
            //   borderColor: "red",
            // },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
          }),
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.primary.main,
            },
          }),
        },
      }
    }
  })

} as ThemeOptions);