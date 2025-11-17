import React from 'react';
import Editor from '@monaco-editor/react';

import { Card, Base } from 'lib/atoms';
import { Input, PropsOf } from 'lib/types';
import { colors } from 'lib/theme';

const THEME = {
    base: 'vs-dark',
    inherit: true,
    rules: [
        {
            token: 'comment',
            foreground: '#5d7988',
            fontStyle: 'italic'
        },
        { token: 'constant', foreground: '#e06c75' }
    ],
    colors: {
        'editor.background': colors.background,
    }
} as const;

const OPTIONS = {
    minimap: {
        enabled: false,
    },
    fontSize: 12,
    cursorStyle: 'block',
    // wordWrap: 'on',
} as const

export const Monaco = ({ value, onChange, ...props }: Input<string> & PropsOf<typeof Card>) => {
    const setEditorTheme = (monaco: any) => {
        monaco.editor.defineTheme('onedark', THEME);
    };

    return (
        <Card {...props}>
            <Editor options={OPTIONS} beforeMount={setEditorTheme} theme="onedark" width="100%" height="100%" defaultLanguage="javascript" defaultValue={value} onChange={onChange} />
        </Card>
    );
};