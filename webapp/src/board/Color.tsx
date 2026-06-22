export class Color {
  r: number = 0;
  g: number = 0;
  b: number = 0;

  constructor(r: number, g: number, b: number) {
    this.r = r;
    this.g = g;
    this.b = b;
  }
  static fromHex(hex: String): Color {
    hex = hex.replace("#", "");
    if (hex.length !== 6) return new Color(255, 0, 0);
    const num = parseInt(hex.toString(), 16);

    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;

    return new Color(r, g, b);
  }

  toRGB() {
    return "rgb(" + this.r.toString() + ", " + this.g.toString() + ", " + this.b.toString() + " " + ")";
  }
  toHexString() {
    return this.r.toString(16).padStart(2, '0') + this.g.toString(16).padStart(2, '0') + this.b.toString(16).padStart(2, '0');
  }
}
