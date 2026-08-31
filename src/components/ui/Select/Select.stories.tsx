import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { Select } from "./Select";

const options = [
  { value: "uk", label: "Українська" },
  { value: "en", label: "English" },
  { value: "pl", label: "Polski" },
];

const meta = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    disabled: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    label: "Language",
    options,
    value: "uk",
    disabled: false,
    onChange: fn(),
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const EnglishSelected: Story = {
  args: { value: "en" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
