namespace xgame {

    export class ColorTools {
        /**
     * RGB 颜色值转换为 HSL.
     * 转换公式参考自 http://en.wikipedia.org/wiki/HSL_color_space.
     * r, g, 和 b 需要在 [0, 255] 范围内
     * 返回的 h, s, 和 l 在 [0, 1] 之间
     *
     * @param   Number  r       红色色值
     * @param   Number  g       绿色色值
     * @param   Number  b       蓝色色值
     * @return  Array           HSL各值数组
     */
        public static rgbToHsl(r, g, b): Array<number> {
            r /= 255, g /= 255, b /= 255;
            var max = Math.max(r, g, b), min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;
            if (max == min) {
                h = s = 0; // achromatic
            } else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            return [Math.floor(h * 100), Math.round(s * 100) / 100, Math.round(l * 100) / 100];
        }

        /**
         * HSL颜色值转换为RGB. 
         * 换算公式改编自 http://en.wikipedia.org/wiki/HSL_color_space.
         * h, s, 和 l 设定在 [0, 1] 之间
         * 返回的 r, g, 和 b 在 [0, 255]之间
         *
         * @param   Number  h       色相
         * @param   Number  s       饱和度
         * @param   Number  l       亮度
         * @return  Array           RGB色值数值
         */
        public static hslToRgb(h: number, s: number, l: number) {
            var r, g, b;
            if (s == 0) {
                r = g = b = l; // achromatic
            } else {
                var hue2rgb = function hue2rgb(p, q, t) {
                    if (t < 0) t += 1;
                    if (t > 1) t -= 1;
                    if (t < 1 / 6) return p + (q - p) * 6 * t;
                    if (t < 1 / 2) return q;
                    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                    return p;
                }
                var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1 / 3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1 / 3);
            }
            return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
        }

        /**
         * 提升指定color的亮度
         * @param color 
         * @param lightValue // 0 - 1
         */
        public static upgradeLight(color: cc.Color, lightValue: number): cc.Color {
            let hsl = this.rgbToHsl(color.r, color.g, color.b);
            // hsl.l = lightValue;
            let newColor = this.hslToRgb(hsl[0], hsl[1], hsl[2]);
            return new cc.Color(newColor[0], newColor[1], newColor[2]);
        }

    }

}