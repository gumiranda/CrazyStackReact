"use client";
export default async function Error(error) {
  return <p>{JSON.stringify(error)}</p>;
}
