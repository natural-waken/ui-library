import { describe, expect, it } from "vitest";
import type { Plugin } from "vue";
import {
    LiAlert,
    LiButton,
    LiButtonGroup,
    LiCollapse,
    LiCollapseItem,
    LiIcon,
    LiTooltip
} from '..'
import { get, map } from "lodash-es";

const comps = [
    LiAlert,
    LiButton,
    LiButtonGroup,
    LiCollapse,
    LiCollapseItem,
    LiIcon,
    LiTooltip,
] as Plugin[];

describe('components/index', () => {
    it.each(
        map(comps, (c) => [get(c, 'name') ?? '', c])
    )('%s should be exported', (_, component) => {
        expect(component).toBeDefined();
        expect(component.install).toBeDefined();
    });
});

