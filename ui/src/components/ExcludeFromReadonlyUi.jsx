export const READONLY_MODE_ENABLED = true;

export default function ExcludeFromReadonlyUi(props) {
  return (
      <>{!READONLY_MODE_ENABLED && props.children}</>
  )
}