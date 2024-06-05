import { renderHook } from "@testing-library/react";

import ToastsProvider from "../../providers/ToastsProvider";

export default function renderTestHook<T>(callback: () => T) {
  return renderHook(callback, {
    wrapper: ToastsProvider,
  });
}
