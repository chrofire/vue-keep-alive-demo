type TreeFilterOpts = {
    childrenField?: string
}

/**
 * 递归查找第一个符合条件的节点
 * @param tree 树
 * @param condition 条件
 * @param options 选项
 * @example
 * ```ts
 * const result = findTreeNode([], () => false)
 * ```
 */
export function findTreeNode<T extends Record<string | number, any>>(
    tree: T[],
    condition: (node: T) => boolean = () => false,
    options: TreeFilterOpts = {}
): T | undefined {
    const { childrenField = 'children' } = options
    for (let i = 0; i < tree.length; i++) {
        const node = tree[i]

        if (condition(node)) {
            return node
        }

        if (Array.isArray(node[childrenField])) {
            const result = findTreeNode(node[childrenField], condition, options)
            if (result) {
                return result
            }
        }
    }
}
