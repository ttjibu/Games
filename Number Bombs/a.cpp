#include<iostream>
#include<cstdio>
using namespace std;
int main()
{
	int left = 1, right = 1000;
	int a[1100], lastcnt, lastpos;
	lastcnt = lastpos = a[left] = 1;
	for (int i = left + 1; i <= right; i++) {
		a[i] = a[i / 2] + 1;
		if (a[i] != lastcnt) {
			cout << lastpos << "~" << i-1 << ": " << lastcnt << endl;
			lastcnt = a[i];
			lastpos = i;
		}
	}
	if (lastpos != right) {
		cout << lastpos << "~" << right << ": " << lastcnt << endl;
	}
	system("pause");
	return 0;
}
