interface ISortedFilters {
  selectedItem: string;
}

export function ServerSelect({ selectedItem }: ISortedFilters) {
  return (
    <div className="server-select">
      <span className="server-select__value">{selectedItem}</span>
      <span className="server-select__line"></span>
      <span className="server-select__bottom"></span>
    </div>
  );
}
