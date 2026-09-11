import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Input } from "./Input";

const meta = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Text input with optional label and error state. onChange is logged in the Actions panel.",
      },
    },
  },
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number"],
    },
    disabled: { control: "boolean" },
    label: { control: "text" },
    placeholder: { control: "text" },
    error: { control: "text" },
    onChange: { action: "changed", description: "Fired when value changes" },
  },
  args: {
    label: "Email",
    placeholder: "you@example.com",
    type: "email",
    disabled: false,
    onChange: fn(),
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Password: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "••••••••",
  },
};

export const WithError: Story = {
  args: {
    label: "Username",
    value: "ab",
    error: "Мінімум 3 символи",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "cannot edit",
  },
};

export const TypeEmail: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Email");
    await userEvent.type(input, "demo@test.com");
    await expect(args.onChange).toHaveBeenCalled();
  },
};
