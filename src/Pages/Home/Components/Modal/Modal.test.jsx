import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "./index";
import styles from "./styles.module.scss";
import "@testing-library/jest-dom/extend-expect";

describe("Modal component", () => {
  test("Should import css module", () => {
    expect(styles).toBeDefined();
  });
  test("Should render content element", () => {
    render(<Modal display={true}>Hello World</Modal>);
    const contentElement = screen.getByText("Hello World");
    expect(contentElement).toBeInTheDocument();
  });
  test("Should fire onClose function on click", () => {
    const mockClose = jest.fn();
    render(<Modal display={true} onClose={mockClose}></Modal>);
    const closeBtn = document.body.querySelector(".closeModalBtn");
    fireEvent.click(closeBtn);
    expect(mockClose.mock.calls.length).toBe(1);
  });
  test("should not render when display is false", () => {
    render(<Modal display={false}></Modal>);
    const modalContainer = document.body.querySelector(".modalContainer");
    expect(modalContainer).not.toBeInTheDocument();
  });
});
