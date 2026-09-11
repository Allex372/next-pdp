import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, within } from "storybook/test";
import { TextLink } from "./TextLink";

const meta = {
  title: "UI/Link",
  component: TextLink,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Styled anchor link. external=true opens in new tab and adds ↗. muted uses secondary color.",
      },
    },
  },
  argTypes: {
    href: { control: "text", description: "Link destination" },
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

export const HasCorrectHref: Story = {
  args: { href: "/demos", children: "Open demos" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole("link", { name: "Open demos" });
    await expect(link).toHaveAttribute("href", "/demos");
  },
};
