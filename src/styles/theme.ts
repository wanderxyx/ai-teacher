import { createTheme, rem, type MantineColorsTuple } from '@mantine/core';

// 间距系统
const spacing = {
  xxs: rem(4),
  xs: rem(8),
  sm: rem(12),
  md: rem(16),
  lg: rem(24),
  xl: rem(32),
  xxl: rem(48),
};

// 主题色板
const colors: Record<string, MantineColorsTuple> = {
  // 蓝色主题
  primary: [
    '#E3F2FD', // 0 - 最浅
    '#BBDEFB', // 1
    '#90CAF9', // 2
    '#64B5F6', // 3
    '#42A5F5', // 4 - 主色
    '#2196F3', // 5
    '#1E88E5', // 6
    '#1976D2', // 7
    '#1565C0', // 8
    '#0D47A1', // 9 - 最深
  ] as MantineColorsTuple,
};

// 主题配置
export const theme = createTheme({
  // 主色调
  primaryColor: 'primary',
  
  // 颜色
  colors: colors,

  // 字体大小
  fontSizes: {
    xs: rem(12),
    sm: rem(13),
    md: rem(14), // 基准字号
    lg: rem(16),
    xl: rem(18),
  },

  // 间距
  spacing: spacing,

  // 圆角
  radius: {
    xs: rem(2),
    sm: rem(4), // 默认圆角
    md: rem(8),
    lg: rem(16),
    xl: rem(32),
  },

  // 其他主题配置
  other: {
    // 过渡动画
    transitionDuration: '0.2s',
    transitionTimingFunction: 'ease',
  },

  // 组件默认属性
  components: {
    Button: {
      defaultProps: {
        radius: 'sm',
      },
    },
    Card: {
      defaultProps: {
        radius: 'sm',
      },
    },
    Paper: {
      defaultProps: {
        radius: 'sm',
      },
    },
  },
});

// 导出类型
export type AppTheme = typeof theme; 