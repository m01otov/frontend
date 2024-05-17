import { forwardRef, useEffect, CSSProperties, PropsWithChildren } from 'react';
import { observer } from 'mobx-react-lite';
import Chart from 'chart.js/auto';
import { getComponentFrom } from '../../../../entities/component';

import {
  TRANSFORM_COMPONENT,
  DIMENSIONS_COMPONENT,
  FILL_COMPONENT,
  CORNER_RADIUS_COMPONENT,
} from '../../../../entities/components';

import type {
  ITransformComponent,
  IDimensionsComponent,
  IFillComponent,
  ICornerRadiusComponent,
} from '../../../../entities/components';

import {
  cornerRadiusStyles,
  dimensionsStyles,
  fillStyles,
  transformStyles,
} from '../../styles.builders';

import styles from './styles.module.scss';

type THTMLCanvasRenderProps = PropsWithChildren<{
  isLocked?: boolean;
  entity: any;
}>;

export const HTMLCanvasRender = observer(
  forwardRef<HTMLCanvasElement, THTMLCanvasRenderProps>((props, ref) => {
    const { entity, isLocked, children } = props;

    const transform = getComponentFrom<ITransformComponent>(
      entity,
      TRANSFORM_COMPONENT
    );
    const dimensions = getComponentFrom<IDimensionsComponent>(
      entity,
      DIMENSIONS_COMPONENT
    );
    const fill = getComponentFrom<IFillComponent>(entity, FILL_COMPONENT);
    const cornerRadius = getComponentFrom<ICornerRadiusComponent>(
      entity,
      CORNER_RADIUS_COMPONENT
    );

    const style = {
        ...transformStyles(transform),
        ...dimensionsStyles(dimensions),
        ...fillStyles(fill),
        ...cornerRadiusStyles(cornerRadius),
      } as unknown as CSSProperties;

    useEffect(() => {
        let chartInstance: Chart | null = null;

        // Проверка типа ref
        if (typeof ref === 'function') {
            // Если ref является функцией-колбэком
            let canvasElement: HTMLCanvasElement | null = null;

            // Передаем элемент canvas в колбэк
            ref(canvasElement);

            // Проверяем, что canvasElement не null
            if (canvasElement) {
                chartInstance = new Chart(canvasElement, {
                    // Конфигурация графика Chart.js
                    type: 'bar',
                    data: {
                        labels: ['Красный', 'Синий', 'Желтый', 'Зеленый', 'Фиолетовый', 'Оранжевый'],
                        datasets: [
                            {
                                label: '# Голосов',
                                data: [12, 19, 3, 5, 2, 3],
                                backgroundColor: [
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(255, 206, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                ],
                                borderColor: [
                                    'rgba(255, 99, 132, 1)',
                                    'rgba(54, 162, 235, 1)',
                                    'rgba(255, 206, 86, 1)',
                                    'rgba(75, 192, 192, 1)',
                                    'rgba(153, 102, 255, 1)',
                                    'rgba(255, 159, 64, 1)',
                                ],
                                borderWidth: 1,
                            },
                        ],
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true,
                            },
                        },
                    },
                });
            }
        } else if (ref && ref.current) {
            // Если ref — объект MutableRefObject
            chartInstance = new Chart(ref.current, {
                // Конфигурация графика
                type: 'bar',
                data: {
                    labels: ['Красный', 'Синий', 'Желтый', 'Зеленый', 'Фиолетовый', 'Оранжевый'],
                    datasets: [
                        {
                            label: '# Голосов',
                            data: [12, 19, 3, 5, 2, 3],
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)',
                                'rgba(255, 159, 64, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }

        // Очистка графика при размонтировании
        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, [ref]);

    return (
        <canvas
            ref={ref}
            className={styles.html_canvas_renderable}
            style={style}
            data-selectable={!isLocked}
            data-id={entity[0].description}
        >
            {children}
        </canvas>
    );
}));

HTMLCanvasRender.displayName = 'HTMLCanvasRender';
