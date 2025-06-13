import Home from '@/assets/homeIcon.svg';
import Cards from '@/assets/greenCard.svg';
import Payments from '@/assets/paymentsIcon.svg';
import Credit from '@/assets/creditIcon.svg';
import Settings from '@/assets/user.svg';
import Freeze from '@/assets/freeze.svg';
import Limit from '@/assets/spendLimit.svg';
import GPay from '@/assets/gPayIcon.svg';
import Replace from '@/assets/replaceCard.svg';
import Cancel from '@/assets/deactivateCard.svg';

export const NavItems = [
  { name: 'Home', icon: Home },
  { name: 'Cards', icon: Cards },
  { name: 'Payments', icon: Payments },
  { name: 'Credit', icon: Credit },
  { name: 'Settings', icon: Settings }
];

export const CardActionsList = [
  { name: 'Freeze card', icon: Freeze, type: 'freeze' },
  { name: 'Set spend limit', icon: Limit, type: 'spendLimit' },
  { name: 'Add to GPay', icon: GPay, type: 'gPay' },
  { name: 'Replace', icon: Replace, type: 'replace' },
  { name: 'Cancel', icon: Cancel, type: 'cancel' }
];

