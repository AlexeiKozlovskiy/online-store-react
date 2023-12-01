type DualRangeInput = {
  value?: string | number;
  defaultValue?: string | number;
  unit: string;
  unitPosition: string;
  onChange?: (e: { target: { value: string } }) => void;
};

export function DualRangeInput({
  value,
  defaultValue,
  unit,
  unitPosition,
  onChange,
}: DualRangeInput) {
  return (
    <>
      <input
        type="text"
        value={value}
        defaultValue={defaultValue}
        className={'item-content__input'}
        maxLength={4}
        onChange={onChange}
      />
      <span className={`item-content-position__${unitPosition}`}>{unit}</span>
    </>
  );
}
