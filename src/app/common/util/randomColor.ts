import { colors } from '../colors';

export function randomColor(): string {
  return colors[Math.floor(Math.random() * colors.length)];
}
