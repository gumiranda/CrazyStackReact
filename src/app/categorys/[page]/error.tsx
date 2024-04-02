"use client";
export default function Error({ error }) {
  return <p>{JSON.stringify(error)}</p>;
}
