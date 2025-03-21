import { ComponentType, isValidElement, ReactNode } from 'react';

type UnknownComponent = ComponentType<any>;

// In development, we compare based on the name of the function because
// React Hot Loader proxies React components in order to make updates. In
// production we can simply compare the components for equality.
const isComponent = (AComponent: UnknownComponent, AnotherComponent: UnknownComponent) =>
  AComponent === AnotherComponent;

// Checks whether `element` is a React element of type `Component` (or one of
// the passed components, if `Component` is an array of React components).
function isElementOfType<P>(
  element: ReactNode | null | undefined,
  Component: ComponentType<P>,
): boolean {
  if (
    element === null ||
    element === undefined ||
    typeof element !== 'object' // catch all other primitives
  ) {
    return false;
  }

  if (!isValidElement(element) || typeof element.type === 'string') {
    return false;
  }

  const { type } = element;
  const Components = Array.isArray(Component) ? Component : [Component];

  return Components.some((AComponent) => typeof type !== 'string' && isComponent(AComponent, type));
}

// Conditionally wraps `element` in `Component` if it is not already an instance of
// `Component`. If `props` is passed, those will be added as props on the
// wrapped component. If `element` is nullish, null is returned.
export default function wrapWithComponent<P>({
  element,
  Component,
  props,
  index,
}: {
  element: ReactNode | null | undefined;
  Component: ComponentType<P>;
  props: P;
  index: number;
}) {
  if (element === null || element === undefined) {
    return null;
  }

  return isElementOfType(element, Component) ? (
    element
  ) : (
    <Component key={index} {...props}>
      {element}
    </Component>
  );
}
