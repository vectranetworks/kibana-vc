const {
  getChecksum
} = require('../checksum')
const { CHECKSUM_KEY } = require('../es')

test('It should get a checksum from a object', () => {
  const kibanaObject = {
    'type': 'index-pattern',
    'updated_at': '2018-04-25T17:09:41.890Z',
    'index-pattern': {
      'title': 'metadata_dhcp*',
      'timeFieldName': 'ts',
      'fields': '[{"name":"_id","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":false},{"name":"_index","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":false},{"name":"_score","type":"number","count":0,"scripted":false,"searchable":false,"aggregatable":false,"readFromDocValues":false},{"name":"_source","type":"_source","count":0,"scripted":false,"searchable":false,"aggregatable":false,"readFromDocValues":false},{"name":"_type","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":false},{"name":"assigned_ip","type":"ip","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"dhcp_server_ip","type":"ip","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"dns_server_ips","type":"ip","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"lease_time","type":"number","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"mac","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"orig_hostname","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"trans_id","type":"number","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"ts","type":"date","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"uid","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true}]'
    }
  }

  const expected = 'dd4c486eafcc729a3256c86083c09666e32038f0'
  expect(getChecksum(kibanaObject)).toEqual(expected)
})

test('It should get a checksum from a object with a config property', () => {
  const kibanaObject = {
    'type': 'index-pattern',
    'updated_at': '2018-04-25T17:09:41.890Z',
    'config': {
      'foo': 'bar'
    },
    'index-pattern': {
      'title': 'metadata_dhcp*',
      'timeFieldName': 'ts',
      'fields': '[{"name":"_id","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":false},{"name":"_index","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":false},{"name":"_score","type":"number","count":0,"scripted":false,"searchable":false,"aggregatable":false,"readFromDocValues":false},{"name":"_source","type":"_source","count":0,"scripted":false,"searchable":false,"aggregatable":false,"readFromDocValues":false},{"name":"_type","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":false},{"name":"assigned_ip","type":"ip","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"dhcp_server_ip","type":"ip","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"dns_server_ips","type":"ip","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"lease_time","type":"number","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"mac","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"orig_hostname","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"trans_id","type":"number","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"ts","type":"date","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"uid","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true}]'
    }
  }

  const expected = 'fddfde425578dafd4c669781e5f1b2f987aabcd7'
  expect(getChecksum(kibanaObject)).toEqual(expected)
})

test('It should get a checksum from a object with a config property and existing checksum', () => {
  const kibanaObject = {
    'type': 'index-pattern',
    'updated_at': '2018-04-25T17:09:41.890Z',
    'config': {
      'foo': 'bar',
      [CHECKSUM_KEY]: 'foooo'
    },
    'index-pattern': {
      'title': 'metadata_dhcp*',
      'timeFieldName': 'ts',
      'fields': '[{"name":"_id","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":false},{"name":"_index","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":false},{"name":"_score","type":"number","count":0,"scripted":false,"searchable":false,"aggregatable":false,"readFromDocValues":false},{"name":"_source","type":"_source","count":0,"scripted":false,"searchable":false,"aggregatable":false,"readFromDocValues":false},{"name":"_type","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":false},{"name":"assigned_ip","type":"ip","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"dhcp_server_ip","type":"ip","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"dns_server_ips","type":"ip","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"lease_time","type":"number","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"mac","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"orig_hostname","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"trans_id","type":"number","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"ts","type":"date","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"uid","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true}]'
    }
  }

  const expected = 'fddfde425578dafd4c669781e5f1b2f987aabcd7'
  expect(getChecksum(kibanaObject)).toEqual(expected)
})

test('It should get a checksum regardless of update date from a object with a config property and existing checksum', () => {
  const kibanaObject = {
    'type': 'index-pattern',
    'updated_at': '2019-04-25T17:09:41.890Z',
    'config': {
      'foo': 'bar',
      [CHECKSUM_KEY]: 'foooo'
    },
    'index-pattern': {
      'title': 'metadata_dhcp*',
      'timeFieldName': 'ts',
      'fields': '[{"name":"_id","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":false},{"name":"_index","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":false},{"name":"_score","type":"number","count":0,"scripted":false,"searchable":false,"aggregatable":false,"readFromDocValues":false},{"name":"_source","type":"_source","count":0,"scripted":false,"searchable":false,"aggregatable":false,"readFromDocValues":false},{"name":"_type","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":false},{"name":"assigned_ip","type":"ip","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"dhcp_server_ip","type":"ip","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"dns_server_ips","type":"ip","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"lease_time","type":"number","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"mac","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"orig_hostname","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"trans_id","type":"number","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"ts","type":"date","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true},{"name":"uid","type":"string","count":0,"scripted":false,"searchable":true,"aggregatable":true,"readFromDocValues":true}]'
    }
  }

  const expected = 'fddfde425578dafd4c669781e5f1b2f987aabcd7'
  expect(getChecksum(kibanaObject)).toEqual(expected)
})
