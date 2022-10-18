import React from "react";
import NextHead from "next/head";
export type HeadProps = {
  title: string;
  description: string;
  children?: React.ReactNode;
};

export const Head = ({
  title = "Belezix Admin",
  description = "Painel Admin do Belezix",
  children,
}: HeadProps) => {
  return (
    <NextHead>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      {children}
    </NextHead>
  );
};
