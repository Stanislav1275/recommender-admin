import type { ForwardRefExoticComponent, ReactNode, RefAttributes } from 'react';
import { createElement, forwardRef } from 'react';

import type { IconProps } from '@/shared/ui/icon';
import { Icon } from '@/shared/ui/icon';

/**
 * Create a icon component
 * @param {string} iconName
 * @param {ReactNode} children
 * @param {IconProps} defaultProps
 * @returns {ForwardRefExoticComponent} ReIconProps
 */
export type SVGIcon = ForwardRefExoticComponent<
  Omit<IconProps, 'ref'> & RefAttributes<SVGSVGElement>
>;
export const createSvgIcon = (iconName: string, children: ReactNode, defaultProps?: IconProps) => {
  const Component = forwardRef<SVGSVGElement, IconProps>((props, ref) =>
    createElement(
      Icon,
      {
        ref,
        ...props,
        ...defaultProps,
      },
      children
    )
  );

  Component.displayName = iconName;

  return Component;
};
