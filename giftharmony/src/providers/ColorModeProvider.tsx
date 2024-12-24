import { createTheme, PaletteMode, ThemeProvider } from "@mui/material";
import { createContext, useMemo, useState } from "react";
import { DefaultTheme, generalThemeConfig } from "../config/themeconfig";


export const ColorModeContext = createContext({
    toggleColorMode: () => { },
});

const ColorModeProvider = ({ children }: { children: React.ReactNode }) => {

    let initMode: PaletteMode = "light";
    const haveTheme = localStorage.getItem("theme");
    if (haveTheme === null) {
        localStorage.setItem("theme", initMode);
    } else {
        initMode = haveTheme as PaletteMode;
    }

    const [mode, setMode] = useState<PaletteMode>(initMode);
    const colorMode = useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode: PaletteMode) => {
                    const modeToSet = prevMode === 'light' ? 'dark' : 'light';
                    localStorage.setItem("theme", modeToSet);
                    return modeToSet;
                });
            },
        }),
        [],
    );

    const theme = useMemo(() => createTheme(DefaultTheme(mode), generalThemeConfig), [mode]);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default ColorModeProvider;