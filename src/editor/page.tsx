
import React from 'react';

import { Base, Flex, Container, Text } from 'lib/atoms';

import { Monaco } from '../components/monaco';
import { process } from './jsonx';

export const EditorPage = () => {
    const [code, setCode] = React.useState('');
    const result = React.useMemo(() => {
        try {
            const result = process({}, JSON.parse(code));
            return JSON.stringify(result);
        } catch (e) {
            return `cant parse: ${e.toString()}`;
        }
    }, [code]);

    return (
        <Container p="128px 0">
            <Text size="32px" weight="bold" mb="48px">Editor Page</Text>

            <Flex h="60vh" gap="12px">
                <Monaco w="100%" h="100%" border="1px solid white" value={code} onChange={($) => setCode($)} />

                <Base w="100%" h="100%">
                    <Text>
                        <code>
                            {result}
                        </code>
                    </Text>
                </Base>
            </Flex>
            
        </Container>
    );
};
