// // eslint-disable-next-line import/no-extraneous-dependencies
// import { ComponentStory, ComponentMeta } from '@storybook/react';

// eslint-disable-next-line import/no-extraneous-dependencies
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button, IButtonProps } from '../components/Button';

// import { Button } from './Button';

// // More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Example/Button',
  component: Button
} as ComponentMeta<typeof Button>;

// eslint-disable-next-line react/function-component-definition
const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const GloabalButton = Template.bind({});
GloabalButton.args = {
  children: 'Click',
  size: 'lg'
} as IButtonProps;
