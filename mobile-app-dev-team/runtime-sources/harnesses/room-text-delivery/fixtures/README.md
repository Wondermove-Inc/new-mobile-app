# Room Text Delivery Fixtures

`valid/` fixtures must pass `validate-room-text-result.mjs`.
`invalid/` fixtures must fail and cover missing proof, room mismatch, literal
`room-N`, empty content, transport failures, malformed responses, non-Room
substitutes, report-destination override mistakes, and duplicate sends after a
confirmed success.
