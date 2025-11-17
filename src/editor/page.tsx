
import React from 'react';

import { Base, Flex, Container, Text } from 'lib/atoms';

import { Monaco } from '../components/monaco';
import { process } from './jsonx';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends React.Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

/* Example 

["@state", {
    "value": "wtf"
}, [
    ["@jsx", "div", {}, [
        ["@jsx", "input", {
            "value": ["@", "value"], 
            "onChange": ["@!!", 
                ["@set", { "value": ["@", "0.target.value"] }]
            ]
        }],
        ["@jsx", "div", {}, 
            ["@.", "value is ", ["@", "value"]]
        ]
    ]]
]]

*/

export const EditorPage = () => {
    const [code, setCode] = React.useState('');

    const result = React.useMemo(() => {
        try {
            const result = process({}, JSON.parse(code));

            // console.log({result})
// 
            // return null;

            return result;
        } catch (e) {
            return `cant parse: ${e.toString()}`;
        }
    }, [code]);

    return (
        <Container p="128px 0">
            <Text size="32px" weight="bold" mb="48px">React with JSONx</Text>

            <Flex h="60vh" gap="12px">
                <Monaco w="100%" h="100%" border="1px solid white" value={code} onChange={($) => setCode($)} />

                <Base w="100%" h="100%">
                    <Text>
                        <code>
                            <ErrorBoundary>
                                {result}
                            </ErrorBoundary>
                        </code>
                    </Text>
                </Base>
            </Flex>
        </Container>
    );
};
