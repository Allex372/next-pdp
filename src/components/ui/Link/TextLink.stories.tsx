import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextLink } from "./TextLink";

const meta = {
  title: "UI/Link",
  component: TextLink,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    href: { control: "text" },
    external: { control: "boolean" },
    muted: { control: "boolean" },
    children: { control: "text" },
  },
  args: {
    href: "/demos",
    children: "Open demos",
    external: false,
    muted: false,
  },
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const External: Story = {
  args: {
    href: "https://storybook.js.org",
    children: "Storybook docs",
    external: true,
  },
};

export const Muted: Story = {
  args: {
    children: "Secondary link",
    muted: true,
  },
};
