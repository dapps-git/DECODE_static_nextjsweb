/**
 * Universal helper for parsing, serializing and rendering parts items.
 * Supports:
 * - JSON array format: [{"name": "Oil Filter", "price": 450}]
 * - Plain string / comma-separated / newline-separated legacy text
 */

export function parsePartsList(partsData) {
  if (!partsData) return [];

  // If already an array
  if (Array.isArray(partsData)) {
    return partsData
      .map((item, idx) => {
        if (!item) return null;
        if (typeof item === 'string') {
          const trimmed = item.trim();
          return trimmed ? { id: idx, name: trimmed, price: '' } : null;
        }
        return {
          id: item.id || idx,
          name: item.name ? String(item.name).trim() : '',
          price:
            item.price !== undefined && item.price !== null && item.price !== ''
              ? Number(item.price)
              : '',
        };
      })
      .filter((p) => p && p.name);
  }

  if (typeof partsData !== 'string') return [];
  const trimmed = partsData.trim();
  if (!trimmed) return [];

  // Check if JSON array string
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    try {
      const parsed = JSON.parse(trimmed);
      if (Array.isArray(parsed)) {
        return parsed
          .map((item, idx) => {
            if (!item) return null;
            if (typeof item === 'string') {
              const name = item.trim();
              return name ? { id: idx, name, price: '' } : null;
            }
            const name = item.name ? String(item.name).trim() : '';
            return name
              ? {
                  id: item.id || idx,
                  name,
                  price:
                    item.price !== undefined && item.price !== null && item.price !== ''
                      ? Number(item.price)
                      : '',
                }
              : null;
          })
          .filter(Boolean);
      }
    } catch {
      // Fallback to line / comma splitting
    }
  }

  // Split on newlines, bullets, or commas
  const items = trimmed
    .split(/\r?\n/)
    .flatMap((line) => line.split(/[,;]/))
    .map((l) => l.replace(/^[•\-\*\d\.\)\s]+/, '').trim())
    .filter(Boolean);

  return items.map((name, idx) => ({
    id: idx,
    name,
    price: '',
  }));
}

export function serializePartsList(partsList) {
  if (!partsList || !Array.isArray(partsList)) return '';
  const valid = partsList
    .map((p) => ({
      name: p.name ? String(p.name).trim() : '',
      price:
        p.price !== '' && p.price !== null && p.price !== undefined && !isNaN(Number(p.price))
          ? Number(p.price)
          : null,
    }))
    .filter((p) => p.name.length > 0);

  return valid.length > 0 ? JSON.stringify(valid) : '';
}

export function calculatePartsTotal(partsList) {
  if (!partsList || !Array.isArray(partsList)) return 0;
  return partsList.reduce((acc, curr) => {
    const val = Number(curr.price);
    return !isNaN(val) && val > 0 ? acc + val : acc;
  }, 0);
}

