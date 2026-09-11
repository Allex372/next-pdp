import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, fn, userEvent, within } from "storybook/test";
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
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Native select with label. Use Controls to change options and value; Actions logs onChange.",
      },
    },
  },
  argTypes: {
    disabled: { control: "boolean" },
    label: { control: "text" },
    value: {
      control: "select",
      options: options.map((o) => o.value),
    },
    onChange: { action: "changed", description: "Fired when selection changes" },
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

export const ChangeLanguage: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.selectOptions(canvas.getByLabelText("Language"), "en");
    await expect(args.onChange).toHaveBeenCalledWith("en");
  },
};
