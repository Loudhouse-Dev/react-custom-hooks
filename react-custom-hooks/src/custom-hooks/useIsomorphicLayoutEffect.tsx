import { useEffect, useLayoutEffect } from 'react'

export default function useIsomorphicLayoutEffect() {
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;
}