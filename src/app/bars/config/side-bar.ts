import { Bar } from '../../model/bar';

export const HOME_SIDE_BAR: Bar = {
  alink: [
    {
      name: 'Home',
      link: '/home',
      icon: 'home',
    },
    {
      name: 'News',
      link: '/home',
      icon: 'newspaper',
    },
  ],
};

export const DEPOSIT_SIDE_BAR: Bar = {
  alink: [
    {
      name: 'home',
      link: 'deposit/home',
      icon: '',
    },
    {
      name: 'deposit',
      link: 'deposit/deposit',
      icon: '',
    },
  ],
};

export const CALC_SIDE_BAR: Bar = {
  alink: [
    {
      name: 'config',
      link: 'calc/config',
      icon: '',
    },
  ],
};

export const CALENDAR_SIDE_BAR: Bar = {
  alink: [
    {
      name: 'home',
      link: 'calendar/home',
      icon: '',
    },
    {
      name: 'calendar',
      link: '/home',
      icon: '',
    },
  ],
};

export const SETTING_SIDE_BAR: Bar = {
  alink: [
    {
      name: 'home',
      link: 'setting/home',
      icon: '',
    },
    {
      name: 'setting',
      link: '/home',
      icon: '',
    },
  ],
};
