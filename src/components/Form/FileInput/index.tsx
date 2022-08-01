import React, { useEffect, useCallback, useState } from 'react';

import { useField } from '@unform/core';
import { useDropzone } from 'react-dropzone';
import { v4 as uuid } from 'uuid';

import { formatBytes } from '../../../helpers/formatBytes';
import { Card } from '../../Card';
import { Flex } from '../../Flex';
import { Heading } from '../../Heading';
import { IconButton } from '../../IconButton';
import { Separator } from '../../Separator';
import { Text } from '../../Text';
import { Error } from '../styles';
import { Container, PreviewItem } from './styles';

interface Props {
  name: string;
  multiple?: boolean;
}
type InputProps = JSX.IntrinsicElements['input'] & Props;

export function FileInput({ name, multiple = true }: InputProps): JSX.Element {
  const { fieldName, registerField, error } = useField(name);

  const [files, setFiles] = useState<{ id: string; file: File }[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (multiple) {
        setFiles((prevState) => [
          ...prevState,
          ...acceptedFiles.map((file) => ({ id: uuid(), file })),
        ]);
      } else {
        setFiles([{ id: uuid(), file: acceptedFiles[0] }]);
      }
    },
    [multiple],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => {
        if (multiple) {
          return files.map((item) => item.file);
        }

        return files[0].file;
      },
      clearValue() {
        setFiles([]);
      },
      setValue(_, value: File | File[]) {
        console.log(value);
      },
    });
  }, [fieldName, registerField, files, multiple]);

  return (
    <Container isErrored={!!error}>
      <div {...getRootProps()}>
        <input {...getInputProps()} />

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="40"
          fill="none"
          viewBox="0 0 30 40"
        >
          <path
            fill="#E4E2E4"
            fillRule="evenodd"
            d="M.6 5.6A4.8 4.8 0 015.4.8h11.007A4.8 4.8 0 0119.8 2.206l8.194 8.194a4.8 4.8 0 011.406 3.393V34.4a4.8 4.8 0 01-4.8 4.8H5.4a4.8 4.8 0 01-4.8-4.8V5.6zM5.4 20a2.4 2.4 0 012.4-2.4h14.4a2.4 2.4 0 010 4.8H7.8A2.4 2.4 0 015.4 20zm2.4 7.2a2.4 2.4 0 000 4.8h14.4a2.4 2.4 0 000-4.8H7.8z"
            clipRule="evenodd"
          />
        </svg>

        {isDragActive ? (
          <Heading size="md">Drop the file{multiple && 's'} here...</Heading>
        ) : (
          <>
            <Flex direction="column" align="flex-start">
              <Heading size="md">
                Select a file{multiple && 's'} to upload
              </Heading>
              <Text size="sm" lowContrast>
                or drag and drop it here
              </Text>
            </Flex>
          </>
        )}
      </div>

      {!!files.length && (
        <Card direction="column" padding={8} gap={8} overflow>
          {files.map((item, index) => (
            <div
              key={item.id}
              style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
            >
              {index > 0 && <Separator />}

              <PreviewItem
                align="center"
                justify="space-between"
                imgSouce={URL.createObjectURL(item.file)}
              >
                <Flex gap={8} align="center">
                  <div className="image" />

                  <Flex direction="column" gap={4}>
                    <Heading size="sm">{item.file.name}</Heading>
                    <Text size="xs" lowContrast>
                      {formatBytes(item.file.size)}
                    </Text>
                  </Flex>
                </Flex>

                <IconButton
                  type="button"
                  icon="FiX"
                  variant="ghost"
                  colorScheme="gray"
                  onClick={() =>
                    setFiles((prevState) =>
                      prevState.filter((fileItem) => fileItem.id !== item.id),
                    )
                  }
                />
              </PreviewItem>
            </div>
          ))}
        </Card>
      )}

      {error && <Error>{error}</Error>}
    </Container>
  );
}
