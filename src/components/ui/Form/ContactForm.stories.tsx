import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, within } from "storybook/test";
import { ContactForm } from "./ContactForm";

const meta = {
  title: "UI/Form/ContactForm",
  component: ContactForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Complex story: composes Input, Select, Button and Link. Demonstrates component-driven development with real interaction flow.",
      },
    },
  },
} satisfies Meta<typeof ContactForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const FillAndSubmit: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText("Email"), "test@example.com");
    await userEvent.selectOptions(canvas.getByLabelText("Language"), "en");
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }));

    await expect(canvas.getByText(/Submitted: test@example.com/)).toBeVisible();
    await expect(canvas.getByText(/lang: en/)).toBeVisible();
  },
};
