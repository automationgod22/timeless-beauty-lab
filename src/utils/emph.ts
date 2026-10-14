// Headings mark their highlighted phrase with *asterisks*; this turns it into <em> (gold italic) safely.
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!);
export const emph = (s: string) => esc(s).replace(/\*(.+?)\*/g, '<em>$1</em>');
export const plain = (s: string) => s.replace(/\*/g, '');
