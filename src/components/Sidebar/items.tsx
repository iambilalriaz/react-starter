import Dashboard from '../SVGS/sidebar/Dashboard';
import Locations from '../SVGS/sidebar/Locations';
import Staff from '../SVGS/sidebar/Staff';

export const items = [
  {
    label: 'Dashboard',
    Icon: (props: { color: string }) => <Dashboard {...props} />
  },
  {
    label: 'Locations',
    Icon: (props: { color: string }) => <Locations {...props} />
  },
  {
    label: 'Staff',
    Icon: (props: { color: string }) => <Staff {...props} />
  }
];
