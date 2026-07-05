import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  size?: number;
  /** Slow, drifting entrance for the splash / loading screen. */
  airy?: boolean;
}

/**
 * Official WS monogram (Brand Kit / 02 Logos / No Role Line).
 * Inlined with currentColor so it follows the Ink/Bone theme.
 */
const PATH_W = "M1228.47 1413.51 L1045.20 976.33 L863.82 1413.51 L722.55 1008.89 L566.17 1008.89 L839.69 1696.33 L1045.20 1268.46 L1249.83 1696.33 L1524.23 1008.89 L1367.99 1008.89 L1228.47 1413.51 Z";
const PATH_S = "M1618.44 1429.21 L1518.23 1499.95 Q1540.79 1547.98 1580.99 1589.26 Q1621.35 1630.54 1675.83 1654.63 Q1730.30 1678.72 1793.22 1678.72 Q1840.33 1678.72 1882.99 1664.45 Q1925.80 1650.18 1960.17 1623.17 Q1994.55 1596.16 2014.19 1556.88 Q2033.83 1517.60 2033.83 1467.57 Q2033.83 1423.38 2019.56 1389.46 Q2005.29 1355.55 1980.28 1330.54 Q1955.26 1305.52 1924.27 1287.88 Q1893.42 1270.08 1859.97 1258.26 Q1807.95 1240.61 1773.58 1223.43 Q1739.20 1206.24 1722.48 1187.21 Q1705.75 1168.03 1705.75 1142.40 Q1705.75 1116.93 1726.31 1097.75 Q1747.03 1078.57 1788.31 1078.57 Q1819.77 1078.57 1844.32 1090.84 Q1868.87 1103.12 1887.90 1123.38 Q1907.08 1143.48 1920.89 1168.03 L2030.92 1107.11 Q2013.27 1070.74 1981.35 1036.83 Q1949.43 1002.92 1901.71 980.82 Q1854.14 958.72 1788.31 958.72 Q1724.47 958.72 1672.91 981.89 Q1621.35 1004.91 1591.43 1047.72 Q1561.50 1090.38 1561.50 1149.31 Q1561.50 1198.41 1580.07 1233.25 Q1598.79 1268.08 1627.18 1292.17 Q1655.72 1316.27 1687.64 1331.46 Q1719.56 1346.65 1744.11 1355.55 Q1790.30 1373.20 1822.22 1388.54 Q1854.14 1403.73 1870.25 1423.38 Q1886.52 1443.02 1886.52 1475.40 Q1886.52 1512.69 1859.97 1534.32 Q1833.42 1555.96 1791.22 1555.96 Q1754.85 1555.96 1723.40 1540.31 Q1692.09 1524.50 1666.01 1496.11 Q1640.07 1467.57 1618.44 1429.21 Z";

export default function Logo({ className = "", size = 36, airy = false }: LogoProps) {
  const ease = [0.22, 1, 0.36, 1] as const;

  // Each letterform drifts up and clears in, staggered, for an airy reveal.
  const pathProps = (delay: number) =>
    airy
      ? {
          initial: { opacity: 0, y: 34 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 2, delay, ease },
        }
      : {};

  return (
    <motion.svg
      width={size}
      height={size * (815 / 1520)}
      viewBox="540 930 1520 815"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      initial={airy ? { opacity: 0, scale: 0.88, filter: 'blur(6px)' } : { opacity: 0 }}
      animate={airy ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 1 }}
      whileHover={{ opacity: 0.7, scale: 1.04 }}
      transition={{ duration: airy ? 1.8 : 0.6, ease }}
    >
      <motion.path d={PATH_W} fill="currentColor" {...pathProps(0.15)} />
      <motion.path d={PATH_S} fill="currentColor" {...pathProps(0.55)} />
    </motion.svg>
  );
}
