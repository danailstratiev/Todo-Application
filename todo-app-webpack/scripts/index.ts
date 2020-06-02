import homePage from './views/homePage';
import { render, handleMenu } from './events/events';

window.addEventListener('DOMContentLoaded', init);
function init(): void {
  render(homePage());
  handleMenu();
}