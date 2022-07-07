/**
 * 最长公共前缀
 * @param {string[]} strs
 * 取第一个作为模板，逐个比较，有一个不符个，模板长度减一，直至所有的都符合
 */
function longestCommonPrefix(strs) {
    if (strs.length === 0) return '';
    let prefix = strs[0];
    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === '') return '';
        }
    }
    return prefix;
}


/**
 * 最长回文子串
 */
// 中心扩散法
function longestPalindrome(s) {
    if (s.length === 0) return '';
    let max = 0;
    let start = 0;
    let end = 0;
    for (let i = 0; i < s.length; i++) {
        // 中心点选择不同
        let len1 = expandAroundCenter(s, i, i);
        let len2 = expandAroundCenter(s, i, i + 1);
        let len = Math.max(len1, len2);
        if (len > max) {
            max = len;
            // 根据中心点位置及长度算出回文子串的起始位置
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
        }
    }
    let expandAroundCenter = function (s, left, right) {
        // 判断是否回文 同时逐步扩散
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return right - left - 1;
    }
    return s.substring(start, end + 1);
}

// 暴力破解
function longestPalindrome(s) {
    // 回文判断
    let isPal = function(str){
        let len = str.length
        for (let i = 0; i < len / 2; i++) {
            if(str[i] != str[len-1-i]) return false
        }
        return true
    }
    let max = 0
    let len = s.length
    let ans = ''
    // 暴力列举出所有的子串
    for (let i = 0; i < len; i++) {
        for (let j = i+1; j <= len; j++) {
            let text = s.slice(i,j)
            console.log(text)
            // 判断是否是回文
            if(isPal(text) && text.length > max){
                // 更新最长回文及其长度
                max = Math.max(text.length, max)
                ans = text
            }
            
        }
    }
    return ans
}


/**
 * 最长不重复子串
 */
function lengthOfLongestSubstring(s) {
    let len = s.length
    let max = 0
    let start = 0
    
    let map = new Map()
    // 遍历字符串
    for (let i = 0; i < len; i++) {
        let char = s[i]
        // 如果map中已经存在该字符，则更新start位置
        if(map.has(char)){
            // 如果存在，则更新起始位置
            start = Math.max(map.get(char) + 1, start)
        }
        map.set(char, i)
        // 更新最长子串长度
        max = Math.max(max, i - start + 1)
    }
    return max
}




