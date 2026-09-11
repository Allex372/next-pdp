import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Primary action button with variants (primary, secondary, danger) and sizes. Use Controls to tweak props; Actions panel logs clicks.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger"],
      description: "Visual style",
    },
    size: {
      control: "radio",
      options: ["sm", "md", "lg"],
      description: "Button size",
    },
    disabled: { control: "boolean" },
    label: { control: "text" },
    onClick: { action: "clicked", description: "Fired on button click" },
  },
  args: {
    label: "Click me",
    variant: "primary",
    size: "md",
    disabled: false,
    onClick: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: "secondary", label: "Secondary" },
};

export const Danger: Story = {
  args: { variant: "danger", label: "Delete" },
};

export const Disabled: Story = {
  args: { disabled: true, label: "Disabled" },
};

export const WithPlayFunction: Story = {
  args: { label: "Test click" },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Test click" });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};
