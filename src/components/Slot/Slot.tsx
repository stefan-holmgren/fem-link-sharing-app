import { Children, cloneElement, HTMLAttributes, isValidElement, ReactNode } from "react";

export type AsChildProps<DefaultElementProps> =
  | ({
      asChild?: false;
    } & DefaultElementProps)
  | ({ asChild: true } & { children: React.ReactNode });

type SlotProps = HTMLAttributes<HTMLElement> & { children?: ReactNode };

export const Slot = ({ children, ...props }: SlotProps) => {
  if (Children.count(children) !== 1) {
    throw new Error("Slot component should have one child");
  }
  if (isValidElement(children)) {
    const { style: childStyle, className: childClassName, ...childProps } = children.props as Record<string, unknown>;
    const { style: slotStyle, className: slotClassName, ...slotProps } = props as Record<string, unknown>;

    return cloneElement(children, {
      ...slotProps,
      ...childProps,
      style: { ...(slotStyle as object), ...(childStyle as object) },
      className: `${slotClassName ?? ""} ${childClassName ?? ""}`.trim(),
    } as Record<string, unknown>);
  }
  return null;
};
