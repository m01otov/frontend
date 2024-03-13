import { CSSProperties, type FC } from 'react';

import styles from './styles.module.scss';

type TLogoProps = {
  size?: number
}

export const Logo: FC<TLogoProps> = ({
  size = 42
}) => (
  <div
    className={styles.logo}
    style={{
      '--size': `${size}px`
    } as CSSProperties}>
    <svg
      width={size}
      height={size}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d={
          `M35 34.79V38.5L31.85 36.4525L23.4675 20.7025C24.6164 
          20.3424 25.6774 19.7464 26.5825 18.9525M26.25 12.25C26.25 
          13.6424 25.6969 14.9777 24.7123 15.9623C23.7277 16.9469 
          22.3924 17.5 21 17.5C20.7436 17.5173 20.4864 17.5173 20.23 
          17.5L10.15 36.4525L7 38.5V34.79L17.1325 15.75C16.4594 14.9975 
          16.0175 14.0669 15.8599 13.0696C15.7022 12.0724 15.8354 11.0508 
          16.2436 10.1274C16.6518 9.20394 17.3175 8.41777 18.1611 7.86309C19.0048 
          7.3084 19.9904 7.00874 21 7V3.5C21.4641 3.5 21.9093 3.68437 22.2374 
          4.01256C22.5656 4.34075 22.75 4.78587 22.75 5.25V7.315C23.7712 7.67605 
          24.6558 8.34412 25.2824 9.22764C25.909 10.1111 26.247 11.1668 26.25 
          12.25ZM22.75 12.25C22.75 11.9039 22.6474 11.5655 22.4551 11.2778C22.2628 
          10.99 21.9895 10.7657 21.6697 10.6332C21.3499 10.5008 20.9981 10.4661 
          20.6586 10.5336C20.3191 10.6011 20.0073 10.7678 19.7626 11.0126C19.5178 
          11.2573 19.3512 11.5691 19.2836 11.9086C19.2161 12.2481 19.2508 12.5999 
          19.3832 12.9197C19.5157 13.2395 19.74 13.5128 20.0278 13.7051C20.3155 
          13.8974 20.6539 14 21 14C21.4641 14 21.9093 13.8156 22.2374 13.4874C22.5656 
          13.1592 22.75 12.7141 22.75 12.25ZM7.385 17.5L10.5 20.65L7.98 25.48L3.675 
          21.175M21 31.08L18.375 28.4375L15.75 33.25L21 38.5L26.25 33.25L23.6775 
          28.4025M34.615 17.5L31.5 20.65L34.125 25.48L38.325 21.175L34.615 17.5Z1`
        }
        fill="currentColor" />
    </svg>
  </div>
)

Logo.displayName = 'Logo';
