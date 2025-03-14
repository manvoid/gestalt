import { expect, test } from '@playwright/test';
import getGridItems from './utils/getGridItems';
import getServerURL from './utils/getServerURL';
import selectors from './utils/selectors';
import waitForRenderedItems from './utils/waitForRenderedItems';

const VIRTUALIZED_TOP = 800;

test.describe('Masonry: virtualization with scroll container', () => {
  test('calculates correct virtual bounds when masonry is offset', async ({ page }) => {
    await page.setViewportSize({ width: 800, height: 800 });
    await page.goto(
      getServerURL({
        virtualize: true,
        scrollContainer: true,
        offsetTop: VIRTUALIZED_TOP,
      }),
    );

    // Virtualization should prevent all items from showing initially.
    const initialGridItems = await getGridItems(page);
    expect(initialGridItems.length).toBe(0);

    await page.evaluate(
      ({ scrollToY, selector }) => {
        const container = document.querySelector(selector);
        // eslint-disable-next-line playwright/no-conditional-in-test
        if (container) {
          container.scrollTop = scrollToY;
        }
      },
      {
        scrollToY: VIRTUALIZED_TOP,
        selector: selectors.scrollContainer,
      },
    );
    await waitForRenderedItems(page, { targetItems: 12 });
    const afterGridItems = await getGridItems(page);
    expect(afterGridItems.length).toBe(12);
  });

  test('calculates correct virtual bounds when masonry is offset and scrolled', async ({
    page,
  }) => {
    const targetItems = 20;
    await page.setViewportSize({ width: 800, height: 800 });
    await page.goto(
      getServerURL({
        virtualize: true,
        scrollContainer: true,
        virtualBoundsTop: VIRTUALIZED_TOP + 300,
        virtualBoundsBottom: VIRTUALIZED_TOP + 300,
        offsetTop: VIRTUALIZED_TOP,
      }),
    );

    // Should not render anything initially
    const initialGridItems = await getGridItems(page);
    expect(initialGridItems.length).toBeGreaterThan(0);
    expect(initialGridItems.length).toBeLessThan(targetItems);

    await page.evaluate(
      ({ scrollToY, selector }) => {
        const container = document.querySelector(selector);
        // eslint-disable-next-line playwright/no-conditional-in-test
        if (container) {
          container.scrollTop = scrollToY;
        }
      },
      { scrollToY: VIRTUALIZED_TOP, selector: selectors.scrollContainer },
    );
    await waitForRenderedItems(page, { targetItems });
    const afterGridItems = await getGridItems(page);
    expect(afterGridItems.length).toBe(targetItems);
  });
});
