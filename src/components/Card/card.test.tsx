import React from "react";
import Card from "./index";
import { CardProps } from "./card";
import CardContent from "./cardContent";
import { render } from "@testing-library/react";
describe("Card Component", () => {
  test("should have custom classes", () => {
    const { container } = render(<Card className="testClassName"></Card>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("testClassName", "neu-card");
  });
  test("should render inset card", () => {
    const { container } = render(<Card inset></Card>);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveClass("inset", "neu-card");
  });
  test("should render card content", () => {
    const { container } = render(
      <Card>
        <CardContent />
      </Card>
    );
    const el = container.firstChild as HTMLElement;
    expect(el.children.length).toBe(1);
  });
});
